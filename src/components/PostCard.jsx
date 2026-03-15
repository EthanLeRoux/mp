import React, { useState } from "react";
import CommentSection from "./CommentSection";

export default function PostCard({ post }) {

	const [viewerIndex, setViewerIndex] = useState(null);

	let images = [];

	if (Array.isArray(post.images) && post.images.length > 0) {
		images = post.images;
	} else if (post.imageData) {
		images = [post.imageData];
	}

	const getImageSrc = (img) => {
		if (typeof img === "string" && !img.startsWith("data:image")) {
			return `data:image/jpeg;base64,${img}`;
		}
		return img;
	};

	const next = (e) => {
		e.stopPropagation();
		setViewerIndex((viewerIndex + 1) % images.length);
	};

	const prev = (e) => {
		e.stopPropagation();
		setViewerIndex((viewerIndex - 1 + images.length) % images.length);
	};

	return (
		<>

			<div className="post-card">

				<div style={{ display: "flex", gap: 12 }}>

					{/* avatar */}
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: "50%",
							background: "#eee",
							flexShrink: 0
						}}
					/>

					<div style={{ flex: 1, minWidth: 0 }}>

						<div style={{ fontWeight: 600 }}>@user</div>

						<div style={{ marginTop: 4, whiteSpace: "pre-line" }}>
							{post.content}
						</div>

						{/* IMAGES */}

						{images.length > 0 && (

							<div
								style={{
									display: "grid",
									gridTemplateColumns:
										images.length === 1
											? "1fr"
											: images.length === 2
											? "1fr 1fr"
											: "1fr 1fr",
									gap: 6,
									marginTop: 10
								}}
							>

								{images.map((img, i) => (

									<img
										key={i}
										src={getImageSrc(img)}
										alt="post"
										onClick={() => setViewerIndex(i)}
										style={{
											width: "100%",
											height: images.length === 1 ? 450 : 220,
											objectFit: "cover",
											borderRadius: 14,
											cursor: "pointer"
										}}
									/>

								))}

							</div>

						)}

						{/* hashtags */}

						<div style={{ marginTop: 8 }}>
							{post.hashtags?.map(tag => (
								<span className="hashtag" key={tag}>{tag}</span>
							))}
						</div>

						{/* time */}

						<div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
							{post.createdAt &&
								new Date(post.createdAt).toLocaleString()}
						</div>

						<CommentSection post={post} />

					</div>

				</div>

			</div>


			{/* IMAGE VIEWER */}

			{viewerIndex !== null && (

				<div
					onClick={() => setViewerIndex(null)}
					style={{
						position: "fixed",
						inset: 0,
						background: "rgba(0,0,0,0.9)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 9999
					}}
				>

					{/* left arrow */}

					{images.length > 1 && (
						<div
							onClick={prev}
							style={{
								position: "absolute",
								left: 30,
								fontSize: 40,
								color: "white",
								cursor: "pointer",
								userSelect: "none"
							}}
						>
							‹
						</div>
					)}

					<img
						src={getImageSrc(images[viewerIndex])}
						alt="expanded"
						style={{
							maxWidth: "95%",
							maxHeight: "95%",
							objectFit: "contain",
							borderRadius: 10
						}}
					/>

					{/* right arrow */}

					{images.length > 1 && (
						<div
							onClick={next}
							style={{
								position: "absolute",
								right: 30,
								fontSize: 40,
								color: "white",
								cursor: "pointer",
								userSelect: "none"
							}}
						>
							›
						</div>
					)}

				</div>

			)}

		</>
	);
}