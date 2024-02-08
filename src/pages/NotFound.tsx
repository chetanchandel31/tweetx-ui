import imgNotFound from "@/assets/img-not-found.svg";
import { Button, Container, Grid, Typography } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function NotFound({}: Props) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={imgNotFound}
          alt="not-found"
          style={{ width: "90%", maxWidth: 400 }}
        />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography color={"text.secondary"} textAlign={"center"}>
            Page not found
          </Typography>
        </Grid>

        <Grid textAlign={"center"} item xs={12}>
          <Button onClick={() => navigate(-1)} startIcon={<ArrowBackRounded />}>
            Go back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
