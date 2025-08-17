// submit.js
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from "react";
import { Icon } from '@iconify/react';


export const SubmitButton = ({ nodes, edges }) => {

    const [loading, setLoading] = useState(false)

    const submitPipeline = async (nodesData, edgesData) => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/pipelines/parse",
                {
                    nodes: nodesData,
                    edges: edgesData,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response) {
                setLoading(false)
                const { num_nodes, num_edges, is_dag } = response.data;

                alert(
                    `================== Api Response ==================\n\n` +
                    `Nodes : ${num_nodes}\n` +
                    `Edges : ${num_edges}\n` +
                    `Is DAG(directed acyclic graph) : ${is_dag ? "✅ Yes" : "❌ No"}`
                );

            }
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Failed to submit pipeline.");
        }
        setLoading(false);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LoadingButton
                loading={loading}
                onClick={() => submitPipeline(nodes, edges)}
                endIcon={<Icon icon="formkit:submit" style={{ fontSize: 24 }} />}
                sx={{
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 500,
                    borderRadius: "12px",
                    px: 2.5,
                    py: 0.7,
                    color: "green",
                    border: "2px solid green",
                    backgroundColor: "rgba(0, 255, 0, 0.1)", // light green
                    "&:hover": {
                        backgroundColor: "rgba(0, 255, 0, 0.2)",
                    },
                }}
            >
                Submit
            </LoadingButton>

        </div>
    );
};
