import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

export const schema = yup.object({
  email: yup.string().email().required("Adres e-maill nie jest poprawny"),
});

type CheckoutFormData = yup.InferType<typeof schema>;

export const NewsletterForm = () => {
  const { register, handleSubmit } = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation(
    "add-to-newsletter",
    async ({ email }: { email: string }) => {
      await fetch("http://localhost:3000/api/hello", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="m-4">
      <input
        aria-label="Email address"
        type="email"
        required
        {...register("email", { required: "Podaj email" })}
        className="w-full appearance-none px-5 py-3 border border-transparent text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 transition duration-150 ease-in-out"
        placeholder="Enter your email"
      />
      <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:bg-blue-400 transition duration-150 ease-in-out"
          type="submit"
        >
          Try it & Subscribe
        </button>
      </div>
    </form>
  );
};
