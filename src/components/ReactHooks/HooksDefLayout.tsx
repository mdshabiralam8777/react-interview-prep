import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface HookData {
  name: string;
  definition: string;
  characteristics: string[];
  basicExampleCode: string;
  advancedExampleCode?: string;
  commonInterviewPoints?: string[];
}

interface HooksDefLayoutProps {
  hooks: HookData[];
}

const HooksDefLayout: React.FC<HooksDefLayoutProps> = ({ hooks }) => {
  const [activeTab, setActiveTab] = useState(0);

  const activeHook = hooks[activeTab];

  return (
    <div className="hooks-definition-layout p-4 max-w-4xl mx-auto">
      {/* Tabs Navigation */}
      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2 mb-4">
          {hooks.map((hook, index) => (
            <button
              key={hook.name}
              type="button"
              className={`btn ${
                activeTab === index ? "btn-info" : "btn-outline-dark"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {hook.name}
            </button>
          ))}
        </div>
        <hr className="border-bottom border-gray-700" />{" "}
        {/* Updated Bootstrap 5 HR class */}
      </div>

      {/* Active Tab Content */}
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-2">Definition</h2>
          <p className="text-gray-300">{activeHook.definition}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Key Characteristics</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            {activeHook.characteristics.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-2">Basic Example</h2>
          <SyntaxHighlighter
            language="typescript"
            showLineNumbers
            customStyle={{ fontSize: "14px", borderRadius: "4px" }}
          >
            {activeHook.basicExampleCode}
          </SyntaxHighlighter>
        </section>

        {activeHook.advancedExampleCode && (
          <section>
            <h2 className="text-2xl font-bold mb-2">Advanced Example</h2>
            <SyntaxHighlighter
              language="typescript"
              showLineNumbers
              customStyle={{ fontSize: "14px", borderRadius: "4px" }}
            >
              {activeHook.advancedExampleCode}
            </SyntaxHighlighter>
          </section>
        )}

        {activeHook.commonInterviewPoints && (
          <section>
            <h2 className="text-2xl font-bold mb-2">Common Interview Points</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-300">
              {activeHook.commonInterviewPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default HooksDefLayout;
