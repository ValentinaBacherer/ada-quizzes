/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-expressions */
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

/*
 * formId to modify , userForm an object with user data
 * for new, to create a new one
 */
const UserForm = ({ formId, userForm, forNewUser = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    ada_student: userForm.ada_student,
    age: userForm.age,
    dislikes: userForm.dislikes,
    image_url: userForm.image_url,
    languages: userForm.languages,
    likes: userForm.likes,
    name: userForm.name,
    organization: userForm.organization,
    password: userForm.password,
  });

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (formPut) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/users/${id}`, {
        body: JSON.stringify(formPut),
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        method: "PUT",
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
      router.push("/users");
    } catch (error) {
      setMessage("Failed to update user");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (formPost) => {
    try {
      const res = await fetch("/api/users", {
        body: JSON.stringify(formPost),
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        method: "POST",
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/users");
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === "ada_student" ? target.checked : target.value;
    /* the field name*/
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure user info is filled for  name, password, species, and image url*/
  const formValidate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.password) err.password = "Password is required";

    if (!form.languages) err.languages = "Languages is required";

    if (!form.image_url) err.image_url = "Image URL is required";

    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          maxLength="20"
          name="name"
          onChange={handleChange}
          required
          type="text"
          value={form.name}
        />

        <label htmlFor="password">Password</label>
        <input
          maxLength="20"
          name="password"
          onChange={handleChange}
          required
          type="text"
          value={form.password}
        />

        <label htmlFor="organization">Organization</label>
        <input
          maxLength="30"
          name="organization"
          onChange={handleChange}
          required
          type="text"
          value={form.organization}
        />

        <label htmlFor="age">Age</label>
        <input
          name="age"
          onChange={handleChange}
          type="number"
          value={form.age}
        />

        <label htmlFor="ada_student">Ada Student</label>
        <input
          checked={form.ada_student}
          name="ada_student"
          onChange={handleChange}
          type="checkbox"
        />

        <label htmlFor="languages">Languages</label>
        <textarea
          maxLength="60"
          name="languages"
          onChange={handleChange}
          value={form.languages}
        />

        <label htmlFor="image_url">Image URL</label>
        <input
          name="image_url"
          onChange={handleChange}
          required
          type="url"
          value={form.image_url}
        />

        <label htmlFor="likes">Likes</label>
        <textarea
          maxLength="60"
          name="likes"
          onChange={handleChange}
          value={form.likes}
        />

        <label htmlFor="dislikes">Dislikes</label>
        <textarea
          maxLength="60"
          name="dislikes"
          onChange={handleChange}
          value={form.dislikes}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default UserForm;
