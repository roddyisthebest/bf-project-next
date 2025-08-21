import { UsersTable } from "@/components/custom/users-table";

export default function UsersPage() {
  return (
    <div className="px-4 pb-4">
      <h1 className="text-2xl font-semibold mb-2">Users</h1>
      <p className="text-gray-600">This is the users page.</p>
      <div className="flex flex-1 w-full">
        <UsersTable />
      </div>

      {/* Add more content or components as needed */}
    </div>
  );
}
