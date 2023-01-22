import styles from "./page.module.css";
import { z } from "zod";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Pitch() {
  const topicSchema = z.object({
    author: z.object({
      firstName: z
        .string({ invalid_type_error: "Input must be a string" })
        .min(1, { message: "Must enter at least one character" })
        .refine((value) => value.match(/^[a-zA-Z]+$/), {
          message: "Numbers are not allowed",
        }),
      lastName: z.string().min(1),
    }),
    topic: z.object({
      title: z.string().min(1),
      description: z.string().max(150).optional(),
      type: z.enum([
        "Hands-On",
        "Vortrag",
        "Lightning Talk",
        "Diskussionsrunde",
      ]),
    }),
  });

  type IFormData = z.infer<typeof topicSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormData>({
    resolver: zodResolver(topicSchema),
  });

  const submitForm: SubmitHandler<IFormData> = (data: IFormData) => {
    console.log(JSON.stringify(data));
  };

  const onError: SubmitErrorHandler<IFormData> = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <main className={styles.main}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(submitForm, onError)}
      >
        <div className={styles.inputContainer}>
          {errors?.author?.firstName && (
            <span>{errors.author.firstName.message}</span>
          )}
          <input
            type="text"
            id={styles.fName}
            placeholder={"First Name"}
            {...register("author.firstName")}
          />
        </div>
        <div className={styles.inputContainer}>
          {errors?.author?.lastName && (
            <span>{errors.author.lastName.message}</span>
          )}
          <input
            type="text"
            id={styles.lName}
            placeholder={"Last Name"}
            {...register("author.lastName")}
          />
        </div>
        <div className={styles.inputContainer}>
          {errors?.topic?.title && <span>{errors.topic.title.message}</span>}
          <input
            type="text"
            id={styles.topicTitle}
            placeholder={"Topic Title"}
            {...register("topic.title")}
          />
        </div>
        <div className={styles.inputContainer}>
          {errors?.topic?.description && (
            <span>{errors.topic.description.message}</span>
          )}
          <textarea
            wrap={"soft"}
            maxLength={150}
            id={styles.topicDescription}
            placeholder={"Topic Description"}
            {...register("topic.description")}
          />
          <span className={styles.charactersLeft}>
            {150 - (watch("topic.description")?.length ?? 0)}
          </span>
        </div>
        <select
          id={styles.type}
          placeholder={"Vortragsart"}
          {...register("topic.type")}
        >
          <option value="Hands-On">Hands-On</option>
          <option value="Vortrag">Vortrag</option>
          <option value="Lightning Talk">Lightning Talk</option>
          <option value="Diskussionsrunde">Diskussionsrunde</option>
        </select>
        <input type="submit" value={"Submit"} id={styles.submit} />
      </form>
    </main>
  );
}
