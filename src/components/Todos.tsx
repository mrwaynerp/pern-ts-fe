import * as React from "react";
import { Paper, Grid, CircularProgress, Box } from "@mui/material";
import Event from "event-emitter";
import TodoList, { columns } from "@components/TodoList";
import _ from "lodash";

const updateTodoArray = (arr: Object[], data: any) => {
	return arr.map((row: any, rdx: number) => {
		if (row.task === data.row.task) {
			return {
				...data.row,
				status: data.nextStatus,
				updatedAt: new Date().getTime(),
			};
		} else {
			return row;
		}
	});
};

interface TodoProps {
	data: Object[];
	setTodos: React.Dispatch<React.SetStateAction<Object[]>>;
}

export default function Todos(props: TodoProps) {
	const [loading, setLoading] = React.useState(true);
	const ev = new (Event as any)();

	React.useEffect(() => {
		props.data && setTimeout(() => setLoading(false), 1000);
	}, [props.data]);

	const handleClickEvent = (data: any) => {
		props.setTodos(updateTodoArray(props.data, data));
	};

	return (
		<div style={{ marginTop: "2rem" }}>
			<Paper
				className="card"
				sx={{
					display: "flex",
					justifyContent: "left",
					height: "80%",
					minHeight: 450,
					borderRadius: 5,
				}}>
				{loading ? (
					<Box m="auto" p={2}>
						<CircularProgress color="success" />
					</Box>
				) : (
					<Grid container sx={{ border: 0 }}>
						{columns.map((col, cdx) => (
							<Grid
								key={cdx}
								item
								lg={3}
								md={6}
								xs={12}
								sx={{
									border: 0.5,
									borderColor: "lightgray",
									borderRadius: 5,
									minHeight: 400,
								}}>
								<TodoList
									title={col}
									data={_.sortBy(
										props.data.filter((d: any) => d.status === col),
										"updatedAt"
									)}
									onClick={handleClickEvent}
								/>
							</Grid>
						))}
					</Grid>
				)}
			</Paper>
		</div>
	);
}
