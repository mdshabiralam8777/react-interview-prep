import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface HooksDefLayoutProps {
  definition: string;
  characteristics: string[];
  basicExampleCode: string;
  advancedExampleCode?: string;
  commonInterviewPoints?: string[];
}

const HooksDefLayout: React.FC<HooksDefLayoutProps> = ({
  definition,
  characteristics,
  basicExampleCode,
  advancedExampleCode,
  commonInterviewPoints
}) => {
  return (
    <div className="hooks-definition-layout p-4 max-w-4xl mx-auto">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Definition</h2>
        <p className="text-gray-300">{definition}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Key Characteristics</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          {characteristics.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Basic Example</h2>
        <SyntaxHighlighter 
          language="typescript" 
          showLineNumbers
          customStyle={{ fontSize: '14px', borderRadius: '4px' }}
        >
          {basicExampleCode}
        </SyntaxHighlighter>
      </section>

      {advancedExampleCode && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Advanced Example</h2>
          <SyntaxHighlighter 
            language="typescript" 
            showLineNumbers
            customStyle={{ fontSize: '14px', borderRadius: '4px' }}
          >
            {advancedExampleCode}
          </SyntaxHighlighter>
        </section>
      )}

      {commonInterviewPoints && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Common Interview Points</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {commonInterviewPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default HooksDefLayout;