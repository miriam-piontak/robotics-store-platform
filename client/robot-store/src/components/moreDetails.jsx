import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getById, getImageUrl } from "../api/robotApi";
import { add } from "../redux/dataReducerCart";
import './moreDetails.css';

function MoreDetails() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dis = useDispatch();

	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {

		// השורה הזו גורמת לדף לקפוץ למעלה מיד עם הטעינה
		window.scrollTo(0, 0);
		const ac = new AbortController();
		async function fetchItem() {
			setLoading(true);
			setError(null);
			try {
				const data = await getById(id);

				// --- כאן הכי כדאי להדפיס! ---
				console.log("הנתונים שחזרו מהשרת:", data);

				setItem(data);
			} catch (err) {
				if (err.name !== 'AbortError') setError("שגיאה בטעינת הפריט");
			} finally {
				setLoading(false);
			}
		}
		if (id) fetchItem();
		return () => ac.abort();
	}, [id]);

	return <>
		<div className="more-details-container">
			{loading && <div className="loading">טוען...</div>}
			{error && <div className="error">{error}</div>}
			{item && <>
				<div className="details-card">
					<div className="image-wrap">
						<img src={getImageUrl(item.img)} alt={item.robotName || 'robot'} />
					</div>
					<div className="info-wrap">
						<h2>{item.robotName}</h2>
						<p className="price">{item.price} ₪</p>
						<p className="stock">במלאי: {item.amountInStock}</p>
						{item.desc && <p className="desc">{item.desc}</p>}
						<div className="actions">
							<button onClick={() => dis(add(item))}>הוסף לסל</button>
							<button onClick={() => navigate(-1)}>חזור</button>
						</div>
					</div>
				</div>
			</>}
		</div>
	</>
}

export default MoreDetails;