import React, {useEffect, useState} from "react";
import {Box, Button, Container, Pagination as MuiPagination, Typography} from "@mui/material";

import ArticleService from "../../api/articles";
import Article from "./Article";
import SearchAndFilter from "./SearchAndFilter";

const ArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchArticles = async () => {
        setLoading(true);
        ArticleService.getArticles({
            search: search,
            page: currentPage,
            category: category,
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
    }, [currentPage, search, category]);

    const handleFilter = (searchTerm, category) => {
        setCurrentPage(1)
        setSearch(searchTerm)
        setCategory(category)
        fetchArticles();
    };

    return (
        <Container>
            <Box className="article-list" sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
                {loading ? (
                    <Typography>Loading articles...</Typography>
                ) : (
                    <>
                        <SearchAndFilter onSearchAndFilter={handleFilter} />
                        {articles.map((article) => (
                            <Article key={article.id} article={article} />
                        ))}
                        {articles && (
                            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "2rem" }}>
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

export default ArticlePage;