import { Metadata } from "next";
import Sidebar from "../../components/common/sidebar";
import ConversationChat from "../ConversationChat";
import ModalDilogGroup from "@/app/ModalDilogGroup";

interface PageProps {
  params: Promise<{ id: string }>; // Expecting params to be a Promise
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Ensure you await params if they are a promise
  const resolvedParams = await params;

  return {
    title: `Dynamic Page - ${resolvedParams.id}`,
    description: `Page for ID: ${resolvedParams.id}`,
  };
}

// Page Component
const Page = async ({ params }: PageProps) => {
  // Resolve params before using them
  const { id } = await params;

  return (
    <>
      <Sidebar />
      <div className="w-100">
        <p className="text-center m-0" hidden>
          Thread: {id}
        </p>
        <ConversationChat id={id} idType="conversation" />
      </div>
      <ModalDilogGroup />
    </>
  );
};

export default Page;
