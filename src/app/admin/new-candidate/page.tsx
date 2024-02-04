"use client";

import { ResumeDropzone } from "@/components/ResumeDropzone";
import Divider from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cx } from "@/lib/cx";
import { extractResumeFromSections } from "@/lib/parse-resume-from-pdf/extract-resume-from-sections";
import { groupLinesIntoSections } from "@/lib/parse-resume-from-pdf/group-lines-into-sections";
import { groupTextItemsIntoLines } from "@/lib/parse-resume-from-pdf/group-text-items-into-lines";
import { readPdf } from "@/lib/parse-resume-from-pdf/read-pdf";
import { TextItems } from "@/lib/parse-resume-from-pdf/types";
import { useEffect, useState } from "react";

const defaultFileUrl =
  "https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf";

export default function Page() {
  const [fileUrl, setFileUrl] = useState<any>("");
  const [textItems, setTextItems] = useState<TextItems>([]);
  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    if (fileUrl === "") return;
    async function test() {
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  useEffect(() => {
    console.log(resume);
  }, [resume]);

  return (
    <div className="container mx-auto">
      {/* <input type="file" onChange={onFileChange} name="" id="" /> */}

      <div className="grid md:grid-cols-6">
        {fileUrl && (
          <div className=" md:col-span-3">
            <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
              <div className="aspect-[9/16]">
                <iframe
                  src={`${fileUrl}#navpanes=0`}
                  className="h-full w-full"
                />
              </div>
            </section>
            {/* <FlexboxSpacer maxWidth={45} className="hidden md:block" /> */}
          </div>
        )}
        <div
          className={cx(" py-5", fileUrl ? "md:col-span-3" : "md:col-span-6")}
        >
          <ResumeDropzone onFileUrlChange={setFileUrl} />
          <Divider text="OR" />
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </div>
      </div>
    </div>
  );
}
