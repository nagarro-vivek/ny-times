import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  ListItem,
  ListItemText,
  List,
  ListItemIcon,
} from "@mui/material";
import Header from "../../common/views/Header";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Loader from "../../common/views/Loader";
import ErrorPage from "../../common/views/ErrorPage";
import usePopularArticles from "../hooks/usePopularArticles";

interface Article {
  title: string;
  abstract: string;
  published_date: string;
  per_facet: string[];
  byline: string;
  section: string;
  subsection: string;
  media: any[];
}

const DetailsPage: React.FC = () => {
  const { id } = useParams();

  // NOTE: Logic to fetch the data on refresh, as we don't have any seprate endpoint to get the data based on the ID
  // We can also use other data persist techniques, like redux-persist or localstorage
  const [article, setArticle] = useState<Article>();

  const { data, error } = usePopularArticles();

  useEffect(() => {
    if (id && data?.results) {
      const articleData = data?.results?.filter(
        (article: { id: number }) => article.id === parseInt(id)
      )[0];

      setArticle(articleData);
    }
  }, [id, data]);

  if (error) return <ErrorPage />;
  if (!data) return <Loader />;

  return (
    <>
      <Header />
      <Container maxWidth="lg" data-testid="details-page">
        <Card>
          <CardMedia
            component="img"
            image={article?.media?.[0]?.["media-metadata"]?.[2]?.url}
            title={article?.title}
          />
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom>
              {article?.title}
            </Typography>
            <Typography variant="h6" component="h5" gutterBottom>
              {article?.abstract}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              Published Date: {article?.published_date}
            </Typography>
            <Typography variant="body1" paragraph>
              {article?.byline}
            </Typography>
            <Typography variant="body1" paragraph>
              Section : {article?.section}
            </Typography>
            <Typography variant="body1" paragraph>
              Sub-section : {article?.subsection}
            </Typography>

            <Typography variant="h5">Postulates</Typography>
            <List>
              {article?.per_facet?.map((item: string) => {
                return (
                  <ListItem key={item}>
                    <ListItemIcon>
                      <RadioButtonCheckedIcon />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default DetailsPage;
