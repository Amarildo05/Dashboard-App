import PropTypes from "prop-types";
import UserActions from "./UserActions";

export default function UserTable({ data, onEdit, onDelete }) {
  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (user) => {
    //     // Check if user._id is an object (from MongoDB objectId) or a string
    //     return user._id && user._id.$oid ? user._id.$oid : user._id;
    //   },
    // },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Membership Start Date",
      dataIndex: "membershipStartDate",
      key: "membershipStartDate",
    },
    {
      title: "Next Payment Date",
      dataIndex: "nextPaymentDate",
      key: "nextPaymentDate",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <UserActions record={record} onEdit={onEdit} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <table className="table-auto w-full bg-white shadow-md rounded-lg border border-gray-200">
      <thead className="bg-gray-200">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-2 text-left font-semibold text-gray-700"
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => {
          const userId = user._id?.$oid || user._id; // Get the correct id format
          const isActive = user.paymentStatus === "active";
          const rowClass = isActive ? "bg-green-100" : "bg-red-100"; // Conditional row color

          return (
            <tr key={userId || index} className={`${rowClass}`}>
              {columns.map((col) => (
                <td key={col.key} className="border-t px-4 py-2">
                  {col.render ? col.render(user) : user[col.dataIndex]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// PropTypes validation for the UserTable component
UserTable.propTypes = {
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};