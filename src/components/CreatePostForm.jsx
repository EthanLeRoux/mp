import React, { useState } from "react";
import { v4 as uuid } from "uuid";

export default function CreatePostForm({ onCreate }) {
	const [text, setText] = useState("");
	const [images, setImages] = useState([]); // Array of File objects

	function extractTags(text) {
		return text.match(/#\w+/g) || [];
	}

	function handleImageChange(e) {
		setImages(Array.from(e.target.files));
	}

	function submit(e) {
		e.preventDefault();
		const post = {
			id: uuid(),
			content: text,
			hashtags: extractTags(text),
			images, // Array of File objects, will be converted to base64 before storing in Firestore
			comments: [],
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			syncStatus: "pending"
		};
		onCreate(post);
		setText("");
		setImages([]);
	}

	// Preview selected images
	const imagePreviews = images.map((file, idx) => {
		const url = URL.createObjectURL(file);
		return <img key={idx} src={url} alt="preview" style={{ maxWidth: 80, maxHeight: 80, marginRight: 4, borderRadius: 6, border: '1px solid #ddd' }} />;
	});

	return (
	  <form onSubmit={submit} className="create-post-form" style={{
	    display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderBottom: '1px solid #eee', background: '#fafafa', borderRadius: 0
	  }}>
	    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
	      {/* Avatar placeholder */}
	      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#eee', flexShrink: 0, marginTop: 2 }} />
	      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
	        <textarea
	          value={text}
	          onChange={e => setText(e.target.value)}
	          placeholder="What's happening?"
	          style={{
	            width: '100%',
	            minHeight: 60,
	            resize: 'vertical',
	            border: '1px solid #ccc',
	            borderRadius: 6,
	            padding: 8,
	            fontSize: 15,
	            background: '#fff',
	            marginBottom: 0
	          }}
	        />
	        <input
	          type="file"
	          accept="image/*"
	          multiple
	          onChange={handleImageChange}
	          style={{ marginBottom: 0 }}
	        />
	        {images.length > 0 && (
	          <div style={{ display: 'flex', gap: 6, margin: '6px 0' }}>{imagePreviews}</div>
	        )}
	      </div>
	    </div>
	    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
	      <button type="submit" style={{
	        background: '#111', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 22px', fontWeight: 500, fontSize: 15, cursor: 'pointer', boxShadow: 'none', transition: 'background 0.2s'
	      }}>Create</button>
	    </div>
	  </form>
	);
}