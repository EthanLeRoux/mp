import React, { useState } from "react";
import CommentSection from "./CommentSection";

export default function PostCard({ post }) {

	const [expandedImage, setExpandedImage] = useState(null);

	// Support both array (new) and string (legacy)
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

	return (
		<>
			<div className="post-card">

				<div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>

					{/* Avatar */}
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

						<div style={{ fontWeight: 500, fontSize: 16, marginBottom: 4 }}>
							@user
						</div>

						<div style={{ fontSize: 15, marginBottom: 8, whiteSpace: "pre-line" }}>
							{post.content}
						</div>

						{/* IMAGES */}
						{images.length > 0 && (
							<div
								style={{
									width: "100%",
									marginTop: 8
								}}
							>

								{images.map((img, idx) => (

									<img
										key={idx}
										src={getImageSrc(img)}
										alt="post"
										onClick={() => setExpandedImage(getImageSrc(img))}
										style={{
											width: "100%",
											maxHeight: 600,
											objectFit: "cover",
											borderRadius: 14,
											cursor: "pointer",
											display: "block",
											marginBottom: 6
										}}
									/>

								))}

							</div>
						)}

						{/* Hashtags */}
						<div style={{ margin: "8px 0" }}>
							{post.hashtags?.map(tag => (
								<span className="hashtag" key={tag}>{tag}</span>
							))}
						</div>

						{/* Timestamp */}
						<div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>
							{post.createdAt && new Date(post.createdAt).toLocaleString()}
						</div>

						<CommentSection post={post} />

					</div>
				</div>
			</div>


			{/* EXPANDED IMAGE MODAL */}

			{expandedImage && (

				<div
					onClick={() => setExpandedImage(null)}
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						background: "rgba(0,0,0,0.9)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 9999,
						cursor: "zoom-out"
					}}
				>

					<img
						src={expandedImage}
						alt="expanded"
						style={{
							maxWidth: "95%",
							maxHeight: "95%",
							objectFit: "contain",
							borderRadius: 10
						}}
					/>

				</div>

			)}

		</>
	);
}