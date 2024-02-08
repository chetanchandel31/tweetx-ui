const fs = require("fs");
const path = require("path");

/*
usage:
npm run starter-dialog "DialogMassUpdate"
*/

// TODO: maybe use change-case at some places and shortId for error #

function getFileContent(dialogName) {
  return `
  import { LoadingButton } from "@mui/lab";
  import { Button, Dialog, DialogContent, Grid, Typography } from "@mui/material";
  import React from "react";
  
  type Props = {
    onClose: () => void;
  };
  
  export default function ${dialogName}({ onClose }: Props) {
    return (
      <Dialog open={true} onClose={onClose}>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">DialogName</Typography>
            </Grid>
  
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid item>
                  <Button color="error" onClick={onClose} size="small">
                    Cancel
                  </Button>
                </Grid>
  
                <Grid item>
                  <LoadingButton style={{ minWidth: 100 }} variant="contained">
                    Continue
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  
  `;
}

function generateFile(dialogName) {
  const dirPath = path.join("./src", `${dialogName}`);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // Specify the file path and name
  const filePath = path.join(dirPath, `index.tsx`);

  // Write the file content to the file
  fs.writeFileSync(filePath, getFileContent(dialogName), "utf-8");

  console.log(`File generated successfully at: ${filePath}`);
}

// Check if the input argument is provided
const userInput = process.argv[2];

if (userInput) {
  generateFile(userInput);
} else {
  console.error("Please provide input.");
}
