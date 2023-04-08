import React, {useEffect, useState} from "react";
import { Box, Button, Typography, Container, Pagination as MuiPagination } from "@mui/material";

import NewsFeedService from "../../api/newsfeed";
import Article from "../articles/Article";
import Search from "./Search";

const NewsFeedPage = () => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchArticles = async () => {
        setLoading(true);
        NewsFeedService.getArticles({
            search: search,
            page: currentPage
        }).then(
            (response) => {
                setArticles(response.data);
                setTotalPages(response.last_page);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching articles:", error);
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        fetchArticles();
    }, [currentPage, search]);

    const handleSearch = (searchTerm) => {
        setCurrentPage(1)
        setSearch(searchTerm)
        fetchArticles();
    };


    return (
        <Container>
            <Box className="article-list" sx={{ marginBottom: "2rem" }}>
                {loading ? (
                    <Typography>Loading articles...</Typography>
                ) : (
                    <>
                        <Search onSearch={handleSearch} />
                        {articles.map((article) => (
                            <Article key={article.id} article={article} />
                        ))}
                        {articles && (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "2rem",
                                }}
                            >
                                <MuiPagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(event, page) => setCurrentPage(page)}
                                    color="primary"
                                    shape="rounded"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default NewsFeedPage;