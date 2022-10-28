import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
	const [data, setData] = useState({ lastSevenDayBooks: [] });

	useEffect(() => {
		axios
			.get("http://localhost:4000/api/v1/admin/home")
			.then((res) => {
				setData((prev) => {
					return {
						...prev,...res.data
					}
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className='home'>
			<div className='homeContainer'>
				<div className='widgets'>
					<Widget type='user' />
					<Widget type='order' />
					<Widget type='earning' />
					<Widget type='balance' />
				</div>
				<div className='charts'>
					<Featured />
					<Chart
						title='Latest 7 Days (Books)'
						aspect={2 / 1}
						data={data.lastSevenDayBooks.map((d)=> ({name:d._id,Total:d.count}))}
					/>
				</div>
				<div className='listContainer'>
					<div className='listTitle'>Latest Transactions</div>
					<Table />
				</div>
			</div>
		</div>
	);
};

export default Home;
