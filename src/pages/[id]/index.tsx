import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";
import { GetServerSideProps } from "next";

import React from "react";

const Note = ({ note }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting]);

    const open = () => setConfirm(true);
    const close = () => setConfirm(false);
    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    };
    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`${process.env.API_URL}/api/notes/${noteId}`, {
                method: "Delete",
            });

            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="note-container">
            {isDeleting ? (
                <Loader active />
            ) : (
                <>
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <Button color="red" onClick={open}>
                        Delete
                    </Button>
                </>
            )}
            <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ query: { id } }) => {
    const res = await fetch(`${process.env.API_URL}/api/notes/${id}`);
    const { data } = await res.json();
    return { props: { note: data } };
};

export default Note;
