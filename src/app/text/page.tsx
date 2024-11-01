// system
import React from "react"
// ui
import Title from "@/ui/Presentation/Title"
import Text from "@/ui/Presentation/Text"
import Demo from "@/ui/Presentation/Demo"
import Beam from "@/ui/Layout/Beam"
import Pillar from "@/ui/Layout/Pillar"
import WallDecorated from "@/ui/Layout/Decorators/WallDecorated"

export default function TextPage() {
  return (
    <WallDecorated>
      <Title size={1}>Text Component</Title>
      <Title size={3}>Description</Title>
      <Text type="paragraph">
        This is a simple text component. It is used to display text on the
        screen.
      </Text>
      <Title size={3}>Usage</Title>
      <Title size={5} halfPadding>
        Sizes
      </Title>
      <Text type="paragraph">
        Text component provides a set of predefined sizes. It depends on the
        body font size. You can select it via props.
      </Text>
      <Beam bottomGap>
        <Demo
          whole
          code={`
        <Beam bottomGap>
          <Text size={"extra-small"} type="plain">
            Extra-small text size
          </Text>
        </Beam>
        <Beam bottomGap>
          <Text size={"small"} type="plain">
            Small text size
          </Text>
        </Beam>
        <Beam bottomGap>
          <Text size={"default"} type="plain">
            Default text size
          </Text>
        </Beam>
        <Beam>
          <Text size={"large"} type="plain">
            Large text size
          </Text>
        </Beam>
          `}
        >
          <Beam bottomGap>
            <Text size={"extra-small"} type="plain">
              Extra-small text size
            </Text>
          </Beam>
          <Beam bottomGap>
            <Text size={"small"} type="plain">
              Small text size
            </Text>
          </Beam>
          <Beam bottomGap>
            <Text size={"default"} type="plain">
              Default text size
            </Text>
          </Beam>
          <Beam>
            <Text size={"large"} type="plain">
              Large text size
            </Text>
          </Beam>
        </Demo>
      </Beam>
      <Title size={5} halfPadding>
        Types
      </Title>
      <Text type="paragraph">
        Text component provides a set of predefined types. The plain type is
        used for regular text. It&apos;s also a default type. The paragraph type
        is used for text blocks, devided from each other by a margin. And
        finally the fit-line type is used for text, that should be displayed in
        one line and should not be wrapped.
      </Text>
      <Beam bottomGap>
        <Demo
          whole
          code={`
          <Beam>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="plain">
                First row of the plain text type.&nbsp;
              </Text>
              <Text size={"default"} type="plain">
                Second row of the plain text type.
              </Text>
            </Pillar>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="paragraph">
                First block of paragraph text type
              </Text>
              <Text size={"default"} type="paragraph">
                Second block of paragraph text type
              </Text>
            </Pillar>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="fit-line">
                Fit-line text type with a very long text that should not be wrapped
              </Text>
            </Pillar>
          </Beam>
          `}
        >
          <Beam>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="plain">
                First row of the plain text type.&nbsp;
              </Text>
              <Text size={"default"} type="plain">
                Second row of the plain text type.
              </Text>
            </Pillar>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="paragraph">
                First block of paragraph text type
              </Text>
              <Text size={"default"} type="paragraph">
                Second block of paragraph text type
              </Text>
            </Pillar>
            <Pillar sm={12} md={4}>
              <Text size={"default"} type="fit-line">
                Fit-line text type with a very long text that should not be
                wrapped
              </Text>
            </Pillar>
          </Beam>
        </Demo>
      </Beam>
      <Title size={5} halfPadding>
        Titles
      </Title>
      <Text type="paragraph">
        You can use the title component to display text with a bigger font size.
        There are 6 sizes available.
      </Text>
      <Beam bottomGap>
        <Demo
          whole
          code={`
        <Beam><Title size={1}>This is a title with 1 size</Title></Beam>
        <Beam><Title size={2}>This is a title with 2 (default) size</Title></Beam>
        <Beam><Title size={3}>This is a title with 3 size</Title></Beam>
        <Beam><Title size={4}>This is a title with 4 size</Title></Beam>
        <Beam><Title size={5}>This is a title with 5 size</Title></Beam>
        <Beam><Title size={6}>This is a title with 6 size</Title></Beam>`}
        >
          <Beam>
            <Title size={1}>This is a title with 1 size</Title>
          </Beam>
          <Beam>
            <Title size={2}>This is a title with 2 (default) size</Title>
          </Beam>
          <Beam>
            <Title size={3}>This is a title with 3 size</Title>
          </Beam>
          <Beam>
            <Title size={4}>This is a title with 4 size</Title>
          </Beam>
          <Beam>
            <Title size={5}>This is a title with 5 size</Title>
          </Beam>
          <Beam>
            <Title size={6}>This is a title with 6 size</Title>
          </Beam>
        </Demo>
      </Beam>
      <Text type="paragraph">
        You can also define the alignment of the text and the padding via props.
      </Text>
      <Beam bottomGap>
        <Demo
          whole
          code={`
        <Beam>
          <Title size={3} align="center" noPadding>
            Centered title, no padding
          </Title>
        </Beam>
        <Beam>
          <Title size={3} align="left" halfPadding>
            Left aligned title, half padding
          </Title>
        </Beam>
        <Beam>
          <Title size={3} align="right">
            Right aligned title, default padding
          </Title>
        </Beam>`}
        >
          <Beam>
            <Title size={3} align="center" noPadding>
              Centered title, no padding
            </Title>
          </Beam>
          <Beam>
            <Title size={3} align="left" halfPadding>
              Left aligned title, half padding
            </Title>
          </Beam>
          <Beam>
            <Title size={3} align="right">
              Right aligned title, default padding
            </Title>
          </Beam>
        </Demo>
      </Beam>
    </WallDecorated>
  )
}
