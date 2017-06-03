using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TextAlign : MonoBehaviour {

	void Start() {
		var words = new List<string>() {"hello", "how", "are", "you", "b"};
		var moreWords = new List<string>() {"I'm", "fine", "thanks", "for", "asking"};
		var paragraph = new Paragraph ();
		paragraph.AddLine (new Line (words, 7));
		paragraph.AddLine(new Line(moreWords, 0));
		Debug.Log(paragraph.ToString());
	}

	class Line {
		public string text;
		public int cost;
		public Line (List<string> words, int padding) {
			var constantSpacing = padding / (words.Count - 1);
			var remainder = padding - (constantSpacing * (words.Count - 1));
			var spacing = new string(' ', constantSpacing + 1);
			var line = words[0];
			for (var i = 1; i < words.Count; i++) {
				if (i <= remainder) {
					line += " ";
				}
				line += spacing + words[i];
			}
			this.text = line;
			this.cost = padding * padding;
		}

		public override string ToString ()
		{
			return this.text;
		}
	}

	class Paragraph {
		List<Line> lines;
		public int cost;

		public Paragraph() {
			this.lines = new List<Line>();
			this.cost = 0;
		}

		public void AddLine(Line line) {
			this.lines.Add (line);
			this.cost += line.cost;
		}

		public void AddParagraph(Paragraph para) {
			foreach (var line in para.lines) {
				AddLine (line);
			}
		}

		public override string ToString ()
		{
			if (lines.Count == 0) {
				return "";
			}
			var stringified = lines[0].text;
			for (var i = 1; i < lines.Count; i++) {
				stringified += "\n" + lines [i].text;
			}
			return stringified;
		}
	}
}
