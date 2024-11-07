// import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";
// // import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'
// // import { currentUser } from '@clerk/nextjs/server';

// import { db } from "./db";
// import SetupPage from "@/app/(setup)/page";

// export const initialProfile = async () => {

//     const user = await currentUser();

//     if (!user) {
//         return redirectToSignIn()
//     }

//     const profile = await db.profile.findUnique({
//         where: {
//             userId: user.id
//         }
//     })

//     if (profile) {
//         return profile;
//     }

//     const newProfile = await db.profile.create({
//         data: {
//             userId: user.id,
//             name: `${user.firstName} ${user.lastName}`,
//             imageUrl: user.imageUrl,
//             email: user.emailAddresses[0].emailAddress
//         }
//     });

//     return newProfile;
// };

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"; // Assuming you're using Next.js
import { db } from "./db";

export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        // Redirect to the sign-in page. Make sure to use an absolute URL.
        return redirect('/sign-in'); // Replace with your actual sign-in route
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    return newProfile;
};
