import { useRouter } from "next/router";

const deleteCookies = (cookies: any, res: any) => {
  try {
    let cookiesArr = [];
    // ## iterating over the list of cookie
    // ## and setting max-age to 0
    for (const cookie in cookies) {
      cookiesArr.push(`${cookie}=;Path=/;MAX-AGE=0`);
    }
    // ## reset the modified cookie list to res
    res.setHeader("set-cookie", cookiesArr);
  } catch (error) {
    console.log("error occured ", error);
  }
  return res;
};

export async function getServerSideProps({ req, res }: any) {
  res = deleteCookies(req.cookies, res);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Logout(){
    if(typeof window !== "undefined"){
        window.location.href = '/login'
    }
}
