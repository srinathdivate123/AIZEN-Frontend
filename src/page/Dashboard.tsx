import ImageUpload from "@/components/UploadImage";

const DashboardPage = () => {

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Upload an Image
          </h2>
          <ImageUpload/>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;