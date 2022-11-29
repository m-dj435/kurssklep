import { useRouter } from "next/router";

const SuccessPage = () => {
  const router = useRouter();
  console.log(router.query.session_id);
  return <div>SSSS</div>;
};

export default SuccessPage;
