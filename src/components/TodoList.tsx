import React from "react";
import { Button, Typography, TextareaAutosize } from "@mui/material";
import { Box } from "@mui/system";
import RequestFactory from "@utils/Request";

export const columns = ["Todo", "In Progress", "In Review", "Complete"];

interface TodoListProps {
	title: string;
	data: Object[];
	onClick: any;
}

export default function TodoList(props: TodoListProps) {
	const onNextStatus = (status: string) => {
		switch (status) {
			case "Todo":
				return "In Progress";
			case "In Progress":
				return "In Review";
			case "In Review":
				return "Complete";
			default:
				return "Todo";
		}
	};

	const handleStatusUpdate = (row: any) => {
		const nextStatus = onNextStatus(row.status);
		const data = { row, nextStatus };

		props.onClick(data);
		RequestFactory.put({ ...data.row, status: nextStatus });
	};

	return (
		<Box>
			<Typography variant="h5" padding={2}>
				{props.title}: {props.data.length || "none"}
			</Typography>
			<Box marginBottom={3} padding={2}>
				{Object.keys(props.data).length === 0 ? (
					<Typography variant="body1" color="gray">
						Yay.. you're all done here!
					</Typography>
				) : (
					props.data.map(
						(row: any, rdx) =>
							row.status === props.title && (
								<Box key={rdx} marginBottom={3}>
									<Button
										size="small"
										variant="contained"
										color="info"
										sx={{ marginRight: ".3rem" }}
										onClick={() => handleStatusUpdate(row)}>
										{row.task}
									</Button>{" "}
									<TextareaAutosize
										aria-label="empty textarea"
										placeholder={row.description}
										style={{ marginTop: "1rem", width: "100%", height: "80px" }}
									/>
								</Box>
							)
					)
				)}
			</Box>
		</Box>
	);
}
