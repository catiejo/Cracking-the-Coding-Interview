using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class chapter8 : MonoBehaviour {

	// 8.1
	public int GetStepCombos(int numSteps) {
		var combos = new int[numSteps + 1];
		combos [0] = 1;
		for (var stepSize = 1; stepSize <= 3; stepSize++) {
			for (var curNum = stepSize; curNum <= numSteps; curNum++) {
				combos [curNum] += combos [curNum - stepSize];
			}
		}
		return combos [numSteps];
	}

	public void TestGetStepCombos(Button button) {
		var allGood = true;
		var answers = new int[51] {
			1,1,2,3,4,5,7,8,10,12,14,
			16,19,21,24,27,30,33,37,40,44,
			48,52,56,61,65,70,75,80,85,91,
			96,102,108,114,120,127,133,140,147,154,
			161,169,176,184,192,200,208,217,225,234,
		};
		for (var i = 0; i <= 50; i++) {
			var answer = GetStepCombos (i);
			if (answer == answers [i]) {
				Debug.Log (i + " = " + answer);
			} else {
				Debug.LogError (i + " = " + answer + ". EXPECTED: " + answers[i]);
				allGood = false;
			}
		}
		if (allGood) {
			button.GetComponent<Image> ().color = Color.green;
		} else {
			button.GetComponent<Image> ().color = Color.red;
		}
	}

	// 8.2
	public class Pos {
		public int x;
		public int y;
		public Pos(int x, int y) {
			this.x = x;
			this.y = y;
		}
		public override string ToString ()
		{
			return string.Format ("({0}, {1})", this.x, this.y);
		}
	}

	public List<Pos> GetRoboPath(bool[,] map) {
		var stack = new Stack<Pos>();
		stack.Push (new Pos (0, 0));
		while (stack.Count != 0) {
			Pos nextRobo;
			var robo = stack.Peek ();
			nextRobo = TryGoRight (robo, map);
			if (nextRobo == null) {
				nextRobo = TryGoDown (robo, map);
				if (nextRobo == null) {
					if (ReachedEnd (robo, map)) {
						return StackPathToList (stack);
					} else {
						map [robo.y, robo.x] = false;
						stack.Pop ();
						continue;
					}
				}
			}
			stack.Push (nextRobo);
		}
		return new List<Pos> (); // empty list because no path found.
	}

	private bool ReachedEnd(Pos robo, bool[,] map) {
		return robo.x == (map.GetLength (1) - 1) && robo.y == (map.GetLength(0) - 1);
	}

	private Pos TryGoRight(Pos robo, bool[,] map) {
		var canGoRight = robo.x < (map.GetLength(1) - 1) && map [robo.y, robo.x + 1];
		return canGoRight ? new Pos (robo.x + 1, robo.y) : null;
	}

	private Pos TryGoDown(Pos robo, bool[,] map) {
		var canGoDown = robo.y < (map.GetLength(0) - 1) && map [robo.y + 1, robo.x];
		return canGoDown ? new Pos (robo.x, robo.y + 1) : null;
	}

	private List<Pos> StackPathToList(Stack<Pos> stack) {
		var list = new List<Pos> ();
		while (stack.Count != 0) {
			list.Add (stack.Pop());
		}
		list.Reverse ();
		return list;	
	}

	public void TestGetRoboPath(Button button) {
		var allGood = true;

		bool[,] unsolvable = new bool[4, 4] {
			{ true, true, true, false },
			{ true, false, true, false },
			{ false, true, false, true },
			{ true, true, true, true }
		}; 
		PrintPath(GetRoboPath(unsolvable));

		bool[,] maze = new bool[4, 8] {
			{ true, true, true, false, true, true, true, true },
			{ false, false, true, true, true, true, true, true },
			{ true, true, true, true, false, true, true, false },
			{ true, true, true, true, false, true, true, true }
		}; 
		PrintPath(GetRoboPath (maze));

		bool[,] allDown = new bool[5, 1] { { true }, { true }, { true }, { true }, { true } };
		PrintPath(GetRoboPath (allDown));

		if (allGood) {
			button.GetComponent<Image> ().color = Color.green;
		} else {
			button.GetComponent<Image> ().color = Color.red;
		}
	}

	private void PrintPath(List<Pos> path) {
		var pathString = "Path is: ";
		foreach (var coord in path) {
			pathString += coord.ToString () + " ";
		}
		Debug.Log (pathString);
	}

	// 8.3
	public int FindMagicIndex(int[] nums) {
		return FindMagic (nums, 0, nums.Length - 1);
	}
	private int FindMagic(int[] nums, int start, int end) {
		if (start > end) {
			return -1;
		}
		int middle = (start + end) / 2;
		if (nums [middle] == middle) {
			return middle;
		}
		return nums [middle] > middle ? FindMagic (nums, start, middle - 1) : FindMagic (nums, middle + 1, end);
	}
	public int FindMagicIndexWithDupes(int[] nums) {
		return FindMagicWithDupes (nums, 0, nums.Length - 1);
	}
	private int FindMagicWithDupes(int[] nums, int start, int end) {
		if (start > end) {
			return -1;
		}
		int middle = (start + end) / 2;
		if (nums [middle] == middle) {
			return middle;
		}
		// Search Left Side
		var leftEnd = Mathf.Min(middle - 1, nums[middle]);
		var leftMagic = FindMagicWithDupes (nums, start, leftEnd);
		if (leftMagic >= 0) {
			return leftMagic;
		}

		// Search Right Side
		var rightStart = Mathf.Max(middle + 1, nums[middle]);
		var rightMagic = FindMagicWithDupes (nums, rightStart, end);
		return rightMagic;
	}

	public void TestFindMagicIndex(Button button) {
		var allGood = true;
		var magic = new int[] { -10, 0, 1, 2, 4, 6, 7, 8, 9, 10, 11 };
		var muggle = new int[] { -10, 0, 1, 2, 5, 6, 7, 8, 9, 10, 11 };

		var magicDupes = new int[] { 3, 3, 4, 6, 6, 6, 6, 8 };
		var muggleDupes = new int[] { -3, -3, 4, 10, 10 };
		var muggleUgly = new int[] { -1, 0, 1, 2, 3, 4 };

		var magicResult = FindMagicIndex (magic);
		if (magicResult == 4) {
			Debug.Log ("Magic index is " + magicResult);
		} else {
			Debug.LogError ("Magic index failed! Expected 4, but returned " + magicResult);
			allGood = false;
		}
		var muggleResult = FindMagicIndex (muggle);
		if (muggleResult == -1) {
			Debug.Log ("Muggle index is " + muggleResult);
		} else {
			Debug.LogError ("Muggle index failed! Expected -1, but returned " + muggleResult);
			allGood = false;
		}

		var magicDupesResult = FindMagicIndexWithDupes (magicDupes);
		if (magicDupesResult == 6) {
			Debug.Log ("Magic dupes index is " + magicDupesResult);
		} else {
			Debug.LogError ("Magic dupes failed! Expected 6, but returned " + magicDupesResult);
			allGood = false;
		}

		var muggleDupesResult = FindMagicIndexWithDupes (muggleDupes);
		if (muggleDupesResult == -1) {
			Debug.Log ("Muggle dupes index is " + muggleDupesResult);
		} else {
			Debug.LogError ("Muggle dupes failed! Expected 6, but returned " + muggleDupesResult);
			allGood = false;
		}

		var muggleUglyResult = FindMagicIndexWithDupes (muggleUgly);
		if (muggleUglyResult == -1) {
			Debug.Log ("Muggle ugly index is " + muggleUglyResult);
		} else {
			Debug.LogError ("Magic index failed! Expected -1, but returned " + muggleUglyResult);
			allGood = false;
		}


		if (allGood) {
			button.GetComponent<Image> ().color = Color.green;
		} else {
			button.GetComponent<Image> ().color = Color.red;
		}

	}
}
