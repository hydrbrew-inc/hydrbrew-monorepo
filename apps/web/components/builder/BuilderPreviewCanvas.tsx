"use client";

import type { BuilderContent } from "@builder.io/sdk";
import { BuilderComponent, builder } from "@builder.io/react";
import { useEffect } from "react";

import { BUILDER_COMMERCE_SECTION_MODEL } from "../../lib/builder/config";
import { getBuilderPublicApiKey } from "../../lib/builder/get-public-api-key";

export function BuilderPreviewCanvas({ content }: { content: BuilderContent }) {
  useEffect(() => {
    const key = getBuilderPublicApiKey();
    if (key) {
      builder.init(key);
    }
  }, []);

  return <BuilderComponent model={BUILDER_COMMERCE_SECTION_MODEL} content={content} />;
}
