import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

/* Allows you to view user card info and delete pet card*/
const UserPage = ({ user }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const userID = router.query.id;

    try {
      await fetch(`/api/users/${userID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the user.");
    }
  };

  return (
    <div key={user._id}>
      <div className="card">
        <img alt="user" src={user.image_url} />
        <h5 className="user-name">{user.name}</h5>
        <div className="main-content">
          <p className="user-name">{user.name}</p>
          <p className="owner">password: {user.password}</p>

          {/* Extra User Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {user.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {user.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>

          <div className="btn-container">
            <Link as={`/${user._id}/edit`} href="/[id]/edit">
              <button className="btn edit" type="button">
                Edit
              </button>
            </Link>
            <button className="btn delete" onClick={handleDelete} type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const user = await User.findById(params.id).lean();

  user._id = user._id.toString();

  return { props: { user } };
}

export default UserPage;
