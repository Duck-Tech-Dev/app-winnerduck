# WinnerDuck App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## License

This project is licensed under the [GNU GPLv3.0](https://github.com/Duck-Tech-Dev/app-winnerduck/blob/main/LICENSE) license.

## Getting Started

Project is using `yarn` for package management.
```bash
# install dependencies
yarn install
```

```bash
# run the development server
yarn dev

## -- or --

# build and start the server
yarn build
yarn start
```

Currently port is set to `5000`, go check `http://localhost:5000` after running the server.

## App Flow

Two user control flows, one for participants and one for users.

Participants are able to:
- Enter raffles using information requested by the raffle creator (name, student ID, e-mail etc.).
- See the current process, winner name, how many people entered

Raffle participants are authenticated using the information requested by the raffle creator + IP address tracking & local storage (cookies).

Users are able to:
- Create raffles for others to join and participate
	- Start time options:
        - Manual
        - Scheduled
            - End time
            - Duration
    - Requested information / form fields
        - Create questions and edit answer types, make it required or optional
    - Description of the winner prize, could be optional
- Start raffles and project in the conferece/event
    - ID and QR code to let people join
    - Participants list, user can remove participants
    - Turn on/off the entry
    - Select x number of winner ducks
- See information about previous raffles


**Participant Perspective**

Scans the QR code -> `winnerduck.com/raffle/[id]`
Goes to `winnerduck.com` and enters the raffle ID. Enter redirects to the raffle page.
Can see the title of the raffle, description, and the prize.
Fills the required information and joins the raffle.
Cannot see any information about the raffle after joining, only the winner name after the raffle ends.

**User Perspective**

Goes to the user panel: `winnerduck.com/panel`

Can see the list of raffles created, ready to be used.
Can start it and project it in the event: `winnerduck.com/panel/raffle/[id]`

Can see the list of previous raffles.
Can click any previous raffle to see the details.
Can download the information.

Can create a new raffle.
Can set the start time, end time, duration, and the requested information.

<br>

God help us.
