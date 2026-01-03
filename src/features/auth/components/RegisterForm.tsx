import { useForm } from "react-hook-form";
import { Form, Button, Spinner } from "react-bootstrap";
import type { RegisterRequest } from "../types/register";

type RegisterFormComponentProps = {
  onSubmit: (data: RegisterRequest) => Promise<void>;
  isSubmitting?: boolean;
};

export default function RegisterFormComponent({ onSubmit, isSubmitting }: RegisterFormComponentProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterRequest>();

  const submit = async (data: RegisterRequest) => {
    data.userName = data.email;
    await onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <div className="d-flex gap-2">
        <Form.Group className="mb-3 flex-fill">
          <Form.Control
            placeholder="First name"
            isInvalid={!!errors.firstName}
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3 flex-fill">
          <Form.Control
            placeholder="Last name"
            isInvalid={!!errors.lastName}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          isInvalid={!!errors.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/,
              message: "Invalid email address",
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          isInvalid={!!errors.password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
            validate: {
              hasUppercase: (v) =>
                /[A-Z]/.test(v) || "Must contain uppercase letter",
              hasNumber: (v) =>
                /[0-9]/.test(v) || "Must contain a number",
              hasSpecial: (v) =>
                /[^A-Za-z0-9]/.test(v) ||
                "Must contain special character",
            },
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-100"
      >
        {isSubmitting ? <Spinner size="sm" /> : "Register"}
      </Button>
    </Form>
  );
}
