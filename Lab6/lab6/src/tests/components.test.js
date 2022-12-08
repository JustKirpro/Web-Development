import renderer from 'react-test-renderer';
import {HelloWorld, Paragraph, List} from "./components";

test('Hello World render test', () => {
    const result = renderer.create(<HelloWorld id = {"1"} />).toJSON(); expect(result).toMatchSnapshot();
});

test('Paragraph render test', () => {
    const result = renderer.create(<Paragraph id = {"2"} />).toJSON(); expect(result).toMatchSnapshot();
});

test('List render test', () => {
    const result = renderer.create(<List id = {"3"} />).toJSON(); expect(result).toMatchSnapshot();
});