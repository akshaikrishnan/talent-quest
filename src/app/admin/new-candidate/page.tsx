"use client";

import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsIntoLines } from "@/lib/parse-resume-from-pdf/group-text-items-into-lines";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { TextItems } from "@/lib/parse-resume-from-pdf/types";
import { useEffect, useState } from "react";

const defaultFileUrl =
  "https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf";

export default function Page() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
      console.log(textItems);
    }
    test();
  }, [fileUrl]);

  useEffect(() => {
    console.log(resume);
  }, [resume]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFileUrl(fileUrl);
    }
  };

  return (
    <div>
      Page
      <input type="file" onChange={onFileChange} name="" id="" />
    </div>
  );
}
