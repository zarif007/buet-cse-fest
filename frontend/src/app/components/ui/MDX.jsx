import React, { useState } from "react";
import remark from "remark";

import remarkHtml from "remark-html";

const MDX = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  const renderMarkdown = () => {
    const markdownAST = remark().parse(markdown);
    const html = remarkHtml().render(markdownAST);
    return html;
  };

  return (
    <div>
      <textarea
        onChange={handleChange}
        value={markdown}
        placeholder="Enter some Markdown..."
      />
      <p>Rendered Markdown:</p>
      <p>{renderMarkdown()}</p>
    </div>
  );
};

export default MDX;
