/*
usage:
npm run starter-delete-hook "DataExport"
*/
import * as changeCase from "change-case";
import fs from "fs";
import path from "path";
const { sentenceCase, kebabCase, pascalCase, camelCase } = changeCase;

function getHookContent(entityName) {
  return `
import { ErrorOutlineRounded } from "@mui/icons-material";
import { Typography, useTheme } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { useSnackbar } from "notistack";
import useAppQueryParams from "queryParams";
import use${pascalCase(
    entityName
  )}Delete from "@/API/react-query/habits/use${pascalCase(entityName)}Delete";

// review all TODOs
// TODO: hook name
export default function useConfirm${pascalCase(entityName)}Delete() {
  const theme = useTheme();
  const [, setQueryParams] = useAppQueryParams();
  const confirm = useConfirm();

  const snackbar = useSnackbar();

  // TODO: RQ hook name
  const ${camelCase(entityName)}Delete = use${pascalCase(entityName)}Delete({
    doWaitForDependentQueries: true,
  });

  const exitView = () => {
    //  TODO: exit any view ?
    // setQueryParams({ "single-contact-id": null });
  };

  const onDelete = ({
    title,
    // TODO: entity id
    ${camelCase(entityName)}Id,
  }: {
    ${camelCase(entityName)}Id: string;
    title?: string;
  }) => {
    confirm({
      title: (
        <Typography
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            gap: theme.spacing(1),
          }}
          variant="h6"
        >
          <ErrorOutlineRounded />
          {/* TODO: entity name */}
          Delete ${kebabCase(entityName)}?
        </Typography>
      ),
      description: (
        //  TODO: entity name 
        <>Are you sure you want to delete {title ? <strong>{title}</strong> : 'this ${kebabCase(
          entityName
        )}'}?</>
      ),
      // TODO: confirmation text
      confirmationText: "Delete ${kebabCase(entityName)}",
    })
      .then(async () => {
        const deleteResult = await ${camelCase(entityName)}Delete.mutateAsync({
          ${camelCase(entityName)}Id,
        });

        if (!deleteResult.error) {
          exitView();
          /* TODO: snackbar message */
          snackbar.enqueueSnackbar("${sentenceCase(entityName)} deleted", {
            variant: "info",
          });
        }
      })
      // TODO: error #
      .catch(() => console.log("#shu${Date.now()}"));
  };

  return { onDelete, isLoading: ${camelCase(entityName)}Delete.isPending };
}
  `;
}

function generateFile(entityName) {
  // Specify the file path and name
  const filePath = path.join("./src", `useConfirm${entityName}Delete.tsx`);

  // Write the entityName to the file
  fs.writeFileSync(filePath, getHookContent(entityName), "utf-8");

  console.log(`File generated successfully at: ${filePath}`);
}

// Check if the input argument is provided
const userInput = process.argv[2];

if (userInput) {
  generateFile(userInput);
} else {
  console.error("Please provide input.");
}
