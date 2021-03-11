import Link from "next/link";

import dbConnect from "../utils/dbConnect";
import User from "../models/User";

const UsersList = ({ users }) => (
  <>
    {/* Create a card for each user */}
    {users.map((user) => (
      <div key={user._id}>
        <div className="card">
          <img alt="user" src={user.image_url} />
          <h5 className="pet-name">{user.name}</h5>
          <div className="main-content">
            <p className="pet-name">{user.name}</p>
            <p className="owner">Password: {user.password}</p>

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
              <Link as={`/${user._id}`} href="/[id]">
                <button className="btn view" type="button">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves user(s) data from mongodb database */
export async function getServerSideProps() {
  // abre coneccion primero, antes de usar el modelo
  await dbConnect();

  /* find all the data in the database */
  const result = await User.find({});

  /* returns an array with many docs(pets(objects))*/
  console.log("gSSP", result);

  /* create an array with all the docs (typeof doc = object)of the collection converted to objects */
  const users = result.map((doc) => {
    console.log("Type of doc", typeof doc);

    /*
     * toObject() Returns an object with each property name
     * and value corresponding to the entries in this collection.
     * Returns a cloned, vanilla object.
     */
    const user = doc.toObject();

    console.log("type of user", typeof user, user);
    user._id = user._id.toString();

    return user;
  });

  return { props: { users } };
}

export default UsersList;
