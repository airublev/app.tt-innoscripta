import React from "react";
import { Box, Typography } from "@mui/material";

const Article = ({ article }) => {
    return (
        <Box className="article" sx={{ marginBottom: "2rem" }}>
            <Typography variant="h4" component="h3" sx={{ marginBottom: "1rem" }}>
                {article.title}
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: "1rem" }}>
                {article.content}
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: "1rem" }}>
                Source:{" "}
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.url}
                </a>
            </Typography>
            <Typography variant="body1" component="p" sx={{ marginBottom: "1rem" }}>
                Category: {article.category ? article.category.name : "Not available"}
            </Typography>
        </Box>
    );

};

export default Article;
