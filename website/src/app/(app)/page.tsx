interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// export const dynamic = "force-static";

async function Page(props: IProps) {
  return <div className="h-[5000px]"></div>;
}

export default Page;
