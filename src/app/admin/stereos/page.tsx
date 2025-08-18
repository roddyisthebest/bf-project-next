import { StereosTable } from "@/components/custom/stereos-table";

export default function StereosPage() {
  return (
    <div className="px-4 pb-4">
      <h1 className="text-2xl font-semibold mb-2">Stereos</h1>
      <p className="text-gray-600">This is the Stereos page.</p>
      <div className="flex flex-1 w-full">
        <StereosTable />
      </div>

      {/* Add more content or components as needed */}
    </div>
  );
}
