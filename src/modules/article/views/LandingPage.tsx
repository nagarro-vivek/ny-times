import React, { useEffect } from "react";
import {
  Container,
  CardMedia,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router";
import Header from "../../common/views/Header";
import Loader from "../../common/views/Loader";
import ErrorPage from "../../common/views/ErrorPage";
import usePopularArticles from "../hooks/usePopularArticles";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  let mediaUrls = [];
  const { data, error } = usePopularArticles();

  useEffect(() => {
    
    mediaUrls = data?.results?.flatMap((result: { media: any[]; }) =>
      result?.media?.flatMap((media: { [x: string]: any[]; }) =>
        media["media-metadata"]?.map((metaData: { url: any; }) => metaData?.url)
      )
    );
    console.log("mediaUrls", mediaUrls);
  }, [data]);

  if (error) return <ErrorPage />;
  if (!data) return <Loader />;

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Articles
        </Typography>
        <Grid container spacing={3}>
          {data?.results?.map(
            (article: {
              id: number;
              title: string;
              published_date: string;
              byline: string;
              media: any;
            }) => (
              <Grid
                item
                key={article?.id}
                xs={12}
                sm={6}
                md={4}
                data-testid="article"
              >
                <Card
                  sx={{ cursor: "pointer", minHeight: "350px" }}
                  onClick={() => navigate(`/details/${article?.id}`)}
                  data-testid="article"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={article?.media?.[0]?.['media-metadata']?.[1]?.url}
                    alt={article.title}
                    data-testid="article"
                  />
                  <CardContent data-testid="article">
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      data-testid="article"
                    >
                      {article.title}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      gutterBottom
                      data-testid="article"
                    >
                      {article.published_date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      data-testid="article"
                    >
                      {article.byline}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
