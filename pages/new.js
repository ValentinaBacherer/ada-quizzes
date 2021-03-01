import UserForm from "../components/UserForm";

const NewUser = () => {
  // define an empty object

  const userForm = {
    age: 0,
    ada_student: false,
    dislikes: [],
    image_url: "",
    languages: [],
    likes: [],
    name: "",
    organization: "",
    password: "",
  };

  return <UserForm formId="add-user-form" userForm={userForm} />;
};

export default NewUser;
