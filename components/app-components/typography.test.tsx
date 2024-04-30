import { Text } from "@/components/app-components/typography";

const typographyText = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];

export default function TypographyTester() {
  return (
    <div>
      {typographyText.map((typography) => (
        <Text className="text-nowrap" key={typography} variant={typography}>
          The quick brown fox jumps over the lazy dog
        </Text>
      ))}
    </div>
  );
}
