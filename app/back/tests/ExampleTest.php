<?php

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    public function testSimpleMath(): void
    {
        $this->assertEquals(1 + 1, 2);
    }
}
