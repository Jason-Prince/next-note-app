import { GetServerSideProps, NextPage } from "next";
import dbConnect, { jsonify } from "@/middleware/dbConnect";
import Fighter from "@/models/Note";

interface Props {
    fighters: [
        {
            firstName: string;
            lastName: string;
        }
    ];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    dbConnect();
    const fighters = await Fighter.find({}).exec();

    return {
        props: {
            fighters: jsonify(fighters),
        },
    };
};
const Home: NextPage<Props> = ({ fighters }) => {
    return (
        <div>
            <h1>A few fighters</h1>
            <ul>
                {fighters.map((fighter) => {
                    return <li>{`${fighter.firstName} ${fighter.lastName}`}</li>;
                })}
            </ul>
        </div>
    );
};

export default Home;
