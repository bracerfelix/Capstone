// import { db } from "@/lib/db";
// import { initialProfile } from "@/lib/initial-profile";

// const SetupPage = async () => {
//     const profile = await initialProfile();
//     const server = await db.server.findFirst({
//         where: {
//             members: {
//                 some: {
//                     profileId: profile.id
//                 }
//             }
//         }
//     })
//     return <div>Create a server</div>
// }
 
// export default SetupPage;

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { NextResponse } from "next/server";

import { redirect } from "next/navigation";
import { InitialModal } from "@/components/modals/initial-modal";

const SetupPage = async () => {
    let profile: any = await initialProfile();

    // Check if the profile is a NextResponse and extract the JSON data
    if (profile instanceof NextResponse) {
        profile = await profile.json(); // Extract the JSON data from the NextResponse
    }

    // Check if the profile object contains an id
    if (!profile || !profile.id) {
        console.error("Profile is undefined or does not contain an id");
        return <div>Error: Invalid profile data</div>;
    }

    console.log(profile);

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });
    if(server){
        return redirect(`/servers/${server.id}`)
    }
    return <InitialModal />;
    
};

export default SetupPage;
