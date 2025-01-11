import Sidebar from "@/app/components/common/sidebar";
import ConversationChat from "../ConversationChat";

interface PageProps {
  params: {
    id: string; // Match the dynamic route folder name [id]
  };
}

const Page = ({ params }: PageProps) => {
  const { id } = params;

  return (
    <>
      <Sidebar />
      <div className="w-100">
        <small className="w-100 d-inline-block text-center">{id}</small>
        <ConversationChat />
      </div>
    </>
  );
};

export default Page;
