import useIsMdDown from "@/hooks/useIsMdDown";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Grow,
  Paper,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

type Props = {};

const HIDE_UNTIL_AT_MS = "api-delay-popover-hide-until-at-ms";

export default function ApiDelayPopover({}: Props) {
  const isMdDown = useIsMdDown();
  const [doShow, setDoShow] = useState(false);

  const [isDontShowChecked, setIsDontShowChecked] = useState(false);

  useEffect(() => {
    let hideUntilAtMs = 0;
    if (!isNaN(Number(localStorage.getItem(HIDE_UNTIL_AT_MS)))) {
      hideUntilAtMs = Number(localStorage.getItem(HIDE_UNTIL_AT_MS));
    }

    if (hideUntilAtMs < Date.now()) {
      setDoShow(true);
    }
  }, []);

  const onDismiss = () => {
    let hideUntilAtMs = Date.now();
    if (isDontShowChecked) {
      hideUntilAtMs += 1000 * 60 * 60 * 24 * 4; // i.e. 4 days from now
    } else {
      hideUntilAtMs += 1000 * 60 * 30; // i.e. 30 mins from now
    }

    localStorage.setItem(HIDE_UNTIL_AT_MS, hideUntilAtMs.toString());
    setDoShow(false);
  };

  const btnClosePopover = (
    <Button color="info" onClick={onDismiss} size="small" variant="contained">
      Dismiss
    </Button>
  );

  return doShow ? (
    <Grow in={doShow} timeout={1000}>
      <Paper
        elevation={10}
        sx={{
          maxWidth: "95vw",
          width: 550,
          position: "fixed",
          right: 12,
          top: 0,
          zIndex: 9000,
        }}
      >
        <Alert action={isMdDown ? null : btnClosePopover} severity="info">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography component={"div"} variant="body2">
                The backend API goes to sleep after some inactivity, so the
                first network request may take 10 to 50 secs to respond.
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isDontShowChecked}
                    onChange={(e) => setIsDontShowChecked(e.target.checked)}
                    color="info"
                    size="small"
                  />
                }
                label={
                  <Typography color="text.secondary" variant="body2">
                    Don't show again
                  </Typography>
                }
              />
            </Grid>

            {isMdDown ? (
              <Grid item xs={12} textAlign="right">
                {btnClosePopover}
              </Grid>
            ) : null}
          </Grid>
        </Alert>
      </Paper>
    </Grow>
  ) : null;
}
