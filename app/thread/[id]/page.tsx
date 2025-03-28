import { Metadata } from "next";
import Sidebar from "../../components/common/sidebar";
import ConversationChat from "../../conversation/ConversationChat";

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
      <div className="wrappper">
        <div
          className="text-center m-0 mt-1 bg-body-tertiary p-2 border-bottom"
          style={{ visibility: "hidden" }}
        >
          Thread : <strong>{id}</strong>
        </div>
        <ConversationChat id={id} idType="thread" />
      </div>
    </>
  );
};

export default Page;
