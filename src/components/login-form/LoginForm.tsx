import { useRouter } from "next/router";
import {
  Form,
  FieldSet,
  Label,
  Input,
  ButtonContainer,
  Button,
} from "./StyledLoginForm";

const LoginForm = () => {
  const router = useRouter();

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const { name, room } = Object.fromEntries(formData.entries());

        router.push({
          pathname: "room",
          query: { name: name.toString(), roomName: room.toString() },
        });
      }}
    >
      <FieldSet>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" required />
      </FieldSet>

      <FieldSet>
        <Label htmlFor="room">Room</Label>
        <Input type="text" name="room" id="room" required />
      </FieldSet>

      <ButtonContainer>
        <Button type="submit">Enter!</Button>
      </ButtonContainer>
    </Form>
  );
};

export default LoginForm;
