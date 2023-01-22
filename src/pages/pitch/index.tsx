import styles from "./page.module.css";
import { z } from "zod";
import {
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { topicSchema } from "@/schemas/topicSchema";
import { getSession } from "next-auth/react";

type IFormData = z.infer<typeof topicSchema>;
export default function Index() {
  const { mutate } = trpc.createTopic.useMutation({ onSuccess: () => reset() });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm<IFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      author: { id: "", firstName: "", lastName: "" },
      topic: { type: "Hands-On", title: "", description: "" },
    },
  });

  getSession().then((session) => {
    if (session?.user.id) {
      setValue("author.id", session?.user.id);
    }
  });

  const submitForm: SubmitHandler<IFormData> = (data: IFormData) => {
    mutate(data);
  };

  const onError: SubmitErrorHandler<IFormData> = (errors: FieldErrors) => {
    console.log(JSON.stringify(getValues()));
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
