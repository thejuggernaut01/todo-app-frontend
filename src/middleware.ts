// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// type CookieObjectProps = {
//   [key: string]: string;
// };

// export function middleware(request: NextRequest) {
//   const stringifyCookie = request.cookies.toString();
//   const cookieObject: CookieObjectProps = {};

//   // Split the string by semicolons to get key-value pairs
//   const cookiePairs = stringifyCookie.split("; ");

//   // Loop through each pair and split it by equals sign to get key and value
//   cookiePairs.forEach((pair) => {
//     const [key, value] = pair.split("=");
//     // Decode URI components if needed
//     cookieObject[key] = decodeURIComponent(value);
//   });

//   const token = cookieObject["refresh-token"];

//   const currentRoute = request.nextUrl.pathname;

//   const authenticatedRoutes = ["/todo"];
//   // Define the routes that do not require authentication
//   const unAuthenticatedRoutes = [
//     "/",
//     "/signup",
//     "/recover-password",
//     "/update-password",
//     "/verify-email",
//   ];
//   // Check if the requested route requires authentication
//   const requiresAuthentication = authenticatedRoutes.some((route) =>
//     currentRoute.startsWith(route)
//   );
//   // Redirect users to the login page if they are not logged in and try to access authenticated routes
//   if (!token && requiresAuthentication) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   // Redirect users to the profile page if they are logged in and try to access unauthenticated routes
//   if (token && unAuthenticatedRoutes.includes(currentRoute)) {
//     return NextResponse.redirect(new URL("/todo", request.url));
//   }
//   // Allow the request to proceed normally if the user is logged in and accessing an authenticated route,
//   // or if the user is not logged in and accessing an unauthenticated route
//   return NextResponse.next();
// }

// export const config = {
//   matcher: "/((?!api|static|.*\\..*|_next).*)",
// };
